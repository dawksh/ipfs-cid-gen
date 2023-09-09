
import { ImporterOptions, importer } from 'ipfs-unixfs-importer'

type Data = string | Buffer | Uint8Array

const main = async (data: Data, options?: ImporterOptions): Promise<string> => {

    if (typeof data === 'string') {
        data = new TextEncoder().encode(data)
    }

    const block = {
        get: async cid => { throw new Error(`unexpected block API get for ${cid}`) },
        put: async () => { throw new Error('unexpected block API put') }
    }

    const result = importer([{ content: data }], block, options)

    for await (const file of result) {
        if (file.path === '') {
            return file.cid.toString()
        }
    }
}

main("Hello World", {cidVersion: 1}).then(res => {
  console.log(res)
})

export { main as generateCID }



