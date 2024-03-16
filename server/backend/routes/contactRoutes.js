const express = require('express');
const router = express.Router();
const {getContact, setContact, updateContact, deleteContact} = require('../controllers/contactController')

// Another method
router.route('/').get(getContact).post(setContact)
router.route('/:id').delete(deleteContact).put(updateContact)

// One method
// router.get('/', getContact)

// router.post('/', setContact)

// router.put('/:id', updateContact)

// router.delete('/:id', deleteContact)


module.exports = router