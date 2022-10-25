import https from 'https';

import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';
import { sellerUpdate } from '../sellerReqsHandler/sellerUpdate.js';

export async function updateSeller(req, res) {
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
            result.sellers.map(async x => {
                const reqq = {}
                const seller = await Seller.findOne({ name: x.username });
                if (seller) {
                	x = { avatarURL: x.avatarURL}
                    reqq.body = x
                    try {
                        let ress = {
                            status: (status) => { return { json: (mess) => { console.log(mess) } } },
                        }
                        ress.seller = seller;
                        await sellerUpdate(reqq, ress);
                    } catch (err) {
                        console.log('errr');
                        console.log(err);
                    }
                }
            })

            res.json(result);

        })
    })
}