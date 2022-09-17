
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

