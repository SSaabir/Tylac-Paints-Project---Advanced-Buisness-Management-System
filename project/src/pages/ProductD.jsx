import React from 'react';
import { Button, Table } from 'flowbite-react';

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, stock: 15 },
  { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 30 },
  { id: 3, name: 'Headphones', category: 'Accessories', price: 150, stock: 50 },
];

export default function ProductD() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Button className="mb-4">Add New Product</Button>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.id}</Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>
                <Button size="xs" className="mr-2">Edit</Button>
                <Button size="xs" color="failure">Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}