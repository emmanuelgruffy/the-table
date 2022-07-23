const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  table_name: {
    type: String,
    required: true,
  },
  table_creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date_created: {
    type: Date,
    required: true,
  },
  games_played: {
    type: Number,
    required: true,
  },
  total_money_invested: {
    type: Number,
    required: true,
  },
  games_data: [
    {
      date_started: {
        type: Date,
        required: true,
      },
      money_invested: {
        type: Number,
        required: true,
      },
      players_sorted_by_result: [
        {
          player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
          },
          result: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});
