import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({ id: 0, title: '', description: '', status: 'To Do' });
  const [filter, setFilter] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleTaskCreation = () => {
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '') {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ id: 0, title: '', description: '', status: 'To Do' });
    }
  };

  const handleTaskStatusChange = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Done') => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const handleTaskDeletion = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    if (filter === 'Done') {
      setFilter('To Do');
    }
  };

  const handleTaskClick = (taskId: number) => {
    setSelectedTaskId(taskId === selectedTaskId ? null : taskId);
  };

  const renderTaskButtons = (task: Task) => (
    <>
      <button
        className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        onClick={() => handleTaskStatusChange(task.id, 'To Do')}
      >
        To Do
      </button>
      <button
        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        onClick={() => handleTaskStatusChange(task.id, 'In Progress')}
      >
        In Progress
      </button>
      <button
        className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        onClick={() => handleTaskStatusChange(task.id, 'Done')}
      >
        Done
      </button>
      <button
        className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        onClick={() => handleTaskDeletion(task.id)}
      >
        Delete
      </button>
    </>
  );

  const filteredTasks = tasks.filter(task => task.status === filter);

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Task Management App</h1>

      <div className="mb-4">
        <label className="block">Title:</label>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block">Description:</label>
        <textarea
          className="border border-gray-300 p-2 w-full"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleTaskCreation}
        >
          Create Task
        </button>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Task List</h2>

        <div className="mb-4 flex space-x-2">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <button
              key={status}
              className={`flex-1 bg-gray-200 px-4 py-2 rounded ${
                filter === status ? 'bg-gray-400' : ''
              }`}
              onClick={() => setFilter(status as 'To Do' | 'In Progress' | 'Done')}
            >
              {status}
            </button>
          ))}
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className="mb-4 p-4 border border-gray-300 rounded">
              <div className="flex justify-between items-center">
                <strong
                  onClick={() => handleTaskClick(task.id)}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {task.title}
                </strong>{' '}
                - {task.status}
              </div>
              {selectedTaskId === task.id && (
                <div className="mt-2">
                  <p className="text-gray-700">{task.description}</p>
                </div>
              )}
              {renderTaskButtons(task)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

