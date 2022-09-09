
//add urls
router.patch('/:id/pic', getProduct, async (req, res) => {
	let arr = req.body.tags;
	if (arr != null) {
		for( let i = 0; i < arr.length; i++){ 
			res.product.tags.push(arr[i]);
	    }
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})

//delete one url
router.delete('/:id/pic', getProduct, async (req, res) => {
	res.product.tags = arrRem(res.product.tags, req.params.tag)
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})


//add tags
router.patch('/:id/tags', getProduct, async (req, res) => {
	let arr = req.body.tags;
	if (arr != null) {
		for( let i = 0; i < arr.length; i++){ 
			res.product.tags.push(arr[i]);
	    }
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})

//delete one tag
router.delete('/:id/tags/:tag', getProduct, async (req, res) => {
	res.product.tags = arrRem(res.product.tags, req.params.tag)
	try {
		const upProduct = await res.product.save();
		res.json(upProduct);
	} catch (err) {
		res.status(400).send({message: err.message})
	}
})

//add one request
router.patch('/:id/requests/:requestID', getProduct, async (req, res) => {
	if (req.params.requestID && req.body) {
		let obj = {};
		obj[req.params.requestID] = req.body;
		res.product.requests.push(obj);
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}

})

//delete one request
router.delete('/:id/requests/:requestID', getProduct, async (req, res) => {
	if (req.params.requestID != null) {
		res.product.requests = res.product.requests.filter( obj => obj.id !== req.params.requestID)
		try {
			const upProduct = await res.product.save();
			res.json(upProduct);
		} catch (err) {
			res.status(400).send({message: err.message})
		}
	}
})