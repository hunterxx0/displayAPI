import https from 'https';

import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';
import {AuthController} from '../auth/AuthController.js';

export async function sellersProd(req, res) {
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
            const req = {}
            req.body = {
            	username: "testtest",
            	email: "testtest@testtest.com",
            	password: "123456",
            	phoneNumber: "123456789",
            	seller_country: "BE",
            	website: "testtest.com",
            }
            try {
            AuthController.sellerSignup(req, {});
            } catch (err) {
            	console.log('errr')
            	console.log(Object.keys(err))
            }
            res.json(result);

        })
    })
}