import { generateCID } from '../index';

const main = async () => {
    const cid = await generateCID('hello world');
    console.log(cid);
}

main();
