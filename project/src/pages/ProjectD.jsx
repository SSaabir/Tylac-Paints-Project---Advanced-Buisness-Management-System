import React from 'react';
import { Button, Table } from 'flowbite-react';

const projects = [
  { id: 1, name: 'Project Alpha', status: 'In Progress', deadline: '2023-12-31' },
  { id: 2, name: 'Project Beta', status: 'Completed', deadline: '2023-11-15' },
  { id: 3, name: 'Project Gamma', status: 'Not Started', deadline: '2024-01-20' },
];

export default function ProjectD() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Button className="mb-4">Add New Project</Button>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Deadline</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>{project.id}</Table.Cell>
              <Table.Cell>{project.name}</Table.Cell>
              <Table.Cell>{project.status}</Table.Cell>
              <Table.Cell>{project.deadline}</Table.Cell>
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