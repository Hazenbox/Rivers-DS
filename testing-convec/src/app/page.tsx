"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const addTask = useMutation(api.tasks.add);
  const toggleComplete = useMutation(api.tasks.toggleComplete);
  const removeTask = useMutation(api.tasks.remove);

  const [newTask, setNewTask] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      await addTask({ text: newTask.trim() });
      setNewTask("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <main className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            task manager
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            testing convex deployment
          </p>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="add a new task..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                add
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {tasks === undefined ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-600"></div>
                <p className="mt-4 text-slate-500 dark:text-slate-400">
                  loading tasks...
                </p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                <p className="text-lg">no tasks yet</p>
                <p className="text-sm mt-1">add your first task above</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl group hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <button
                    onClick={() =>
                      toggleComplete({ id: task._id as Id<"tasks"> })
                    }
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-slate-300 dark:border-slate-500 hover:border-green-500"
                    }`}
                  >
                    {task.isCompleted && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`flex-1 text-slate-700 dark:text-slate-200 ${
                      task.isCompleted ? "line-through text-slate-400" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => removeTask({ id: task._id as Id<"tasks"> })}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {tasks && tasks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {tasks.filter((t) => t.isCompleted).length} of {tasks.length}{" "}
                tasks completed
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            powered by{" "}
            <a
              href="https://convex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              convex
            </a>{" "}
            +{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              next.js
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
