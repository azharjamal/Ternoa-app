const Book = require('../models/Book');
const mongo = require('mongodb')

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json({ books });
};

exports.postBook = async (req, res) => {
  const { title,  description} = req.body;
  const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
  const book = new Book({
    title,
    description,
    imagePath,
  });
  const createdBook = await book.save();
  res.status(201).json({
    book: {
      ...createdBook._doc,
    },
  });
};


 exports.DeleteBook = async (req, res, next) => {

    const deletebook = await Book.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            console.log(data);
            res.status(200).json({data})
        }
    })
 };


 exports.UpdateBook = async (req, res, next) => {
     const { title,  description} = req.body;
     const _id = req.params.id;
     const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
     const book = new Book({
         _id,
        title,
        description,
        imagePath,
      });        
    const updatebook = await Book.findByIdAndUpdate(req.params.id, {$set: book}, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({data})
        }
    })
 };

