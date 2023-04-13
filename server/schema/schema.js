const Board = require('../models/Board');
const Column = require('../models/Column');
const Task = require('../models/Task');
const Subtask = require('../models/Subtask');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

// Board Type
const BoardType = new GraphQLObjectType({
  name: 'Board',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    columns: { type: GraphQLList(GraphQLID) },
  }),
});

const ColumnType = new GraphQLObjectType({
  name: 'Column',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    order: { type: GraphQLList(GraphQLString) },
    board: { type: GraphQLID },
  }),
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    column: { type: GraphQLID },
  }),
});

const SubtaskType = new GraphQLObjectType({
  name: 'Subtask',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    task: { type: GraphQLID },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    boards: {
      type: new GraphQLList(BoardType),
      resolve(parent, args) {
        return Board.find().populate();
      },
    },
    board: {
      type: BoardType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Board.findById(args.id);
      },
    },
    columns: {
      type: new GraphQLList(ColumnType),
      args: { board: { type: GraphQLID } },
      resolve(parent, args) {
        return Column.find({ board: args.board });
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: { column: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.find({ column: args.column });
      },
    },
    subtasks: {
      type: new GraphQLList(SubtaskType),
      args: { task: { type: GraphQLID } },
      resolve(parent, args) {
        return Subtask.find({ task: args.task });
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBoard: {
      type: BoardType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const board = new Board({
          name: args.name,
          columns: [],
        });
        return board.save();
      },
    },
    addColumn: {
      type: ColumnType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        board: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const column = new Column({
          name: args.name,
          board: args.board,
        });
        await column.save();
        await Board.findByIdAndUpdate(args.board, {
          $push: { columns: column._id },
        });
        return column;
      },
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        column: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const task = new Task({
          title: args.title,
          description: args.description,
          column: args.column,
        });
        await task.save();
        await Column.findByIdAndUpdate(args.column, {
          $push: { tasks: task._id },
        });
        return task;
      },
    },
    addSubtask: {
      type: SubtaskType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        task: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const subtask = new Subtask({
          title: args.title,
          task: args.task,
        });
        await subtask.save();
        await Task.findByIdAndUpdate(args.task, {
          $push: { subtasks: subtask._id },
        });
        return subtask;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
