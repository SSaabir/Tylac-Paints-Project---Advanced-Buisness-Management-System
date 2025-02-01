import React from 'react';
import { Button, Table } from 'flowbite-react';

const messages = [
  { id: 1, sender: 'John Doe', subject: 'Meeting Reminder', date: '2023-10-10' },
  { id: 2, sender: 'Jane Smith', subject: 'Project Update', date: '2023-10-09' },
  { id: 3, sender: 'Company HR', subject: 'Policy Change', date: '2023-10-08' },
];

export default function InboxD() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Sender</Table.HeadCell>
          <Table.HeadCell>Subject</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {messages.map((message) => (
            <Table.Row key={message.id}>
              <Table.Cell>{message.id}</Table.Cell>
              <Table.Cell>{message.sender}</Table.Cell>
              <Table.Cell>{message.subject}</Table.Cell>
              <Table.Cell>{message.date}</Table.Cell>
              <Table.Cell>
                <Button size="xs" className="mr-2">Reply</Button>
                <Button size="xs" color="failure">Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}