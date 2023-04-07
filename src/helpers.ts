export const getJsonExample = () => ({
  store: {
    books: [
      {
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        category: "reference",
        price: 24.99,
      },
      {
        title: "David Copperfield",
        author: "Charles Dickens",
        category: "fiction",
        price: 12.99,
      },
      {
        title: "Moby Dick",
        author: "Herman Melville",
        category: "fiction",
        price: 8.99,
      },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        category: "fiction",
        price: 19.99,
      },
    ],
  },
});

const QUERY_EXAMPLES: string[] = [
  "$.store.books[?@.author == 'Fyodor Dostoevsky']['title', 'author', 'price']",
  "$.store.books[?search(@.author, 'Diamond|Dickens')]",
  "$.store.books[?@.price < 20 && @.price > 10]",
  "$..books[?@.price < 20].title",
  "$..books[?@.category == 'reference'].*",
  "$.store.books[::-1]",
];

export const getQueryExample = () =>
  QUERY_EXAMPLES[Math.floor(Math.random() * QUERY_EXAMPLES.length)];
