import https from 'https';

import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';
import { createProd } from '../upProductReq/createProd.js';

export async function prodfill(req, res) {
    let data = '';
    const request = https.get({
        path: `/products`,
        hostname: "ebay-api-get.herokuapp.com",
        method: 'GET'
    }, ress => {
        ress.on('data', chunk => { data += chunk })
        ress.on('end', () => {
            console.log('data');
            const result = JSON.parse(data);
            const proddd = [{
                title: 'testprod',
                descriptions: 'whatever',
                seller_name: 'apple',
                pics_url: ['https://dummyjson.com/image/i/products/2/1.jpg'],
                category: 'Electronics',
                tags: ['aaa', 'sss'],
                characteristics: { Color: ['red'] }
            }]

            result.products.splice(0, 20).map(async x => {
            	const dbprod = Product.findOne({title: x.title});
                if (!dbprod) {
                    const seller = await Seller.findOne({ name: x.seller_name })
                    if (seller) {
                    	delete x.thumbnail;
                        x.seller_id = seller._id.toString();
                        const reqq = {}
                        reqq.body = x
                        try {
                            let ress = {
                                status: (status) => { return { json: (mess) => { console.log(mess) } } },
                            }
                            await createProd(reqq, ress);
                        } catch (err) {
                            console.log('errr')
                            console.log(err)
                        }
                    } else console.log('---------------skip\n\n\n\n');
                }else console.log('prod-----------------------------skip\n\n\n\n\n\n');
            })
            console.log(result.products.length)
            res.json(result);

        })
    })
}