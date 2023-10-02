
import { ImporterOptions, importer } from 'ipfs-unixfs-importer'
import { MemoryBlockstore } from 'blockstore-core/memory'


type Data = string | Buffer | Uint8Array

const main = async (data: Data, options?: ImporterOptions): Promise<string> => {

    if (typeof data === 'string') {
        data = new TextEncoder().encode(data)
    }

    // const block = new MemoryBlockstore()

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
export { main as generateCID }



