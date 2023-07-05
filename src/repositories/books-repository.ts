import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import prisma from "../database";

export async function getBooks(): Promise<Book[]>{
  const result = await prisma.books.findMany();
  return result
} 

export async function getBook(id: number): Promise<Book>{
  const result = await prisma.books.findUnique({
    where: {
      id: id
    }
  })
  return result;
}

export async function createBook(book: CreateBook) {
  const { title, cover, author, publisher, purchaseDate } = book;

  const date = new Date(purchaseDate)

  const result = await prisma.books.create({
    data: {
      title,
      cover,
      author,
      publisher,
      purchaseDate:date
    }
  })

  return result;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;

  const result = await prisma.books.update({
    where:{
      id: bookId
    },
    data:{
      grade,
      review,
      read: true
    }
  })
  return result;
}