import Point from "../../../models/point";
import Task from "../../../models/task";
import { connectToDB } from "../../../utils/database";

export async function POST(request) {
  await connectToDB();
  try {
    const dataFromBody = await request.json();

    const task = new Task(dataFromBody);
    await task.save();
    return new Response(
      JSON.stringify({
        success: true,
        data: task,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 400 }
    );
  }
}

export async function GET(request) {
  await connectToDB();

  let query = {};

  const employeeId = request.nextUrl.searchParams?.get("employeeId");

  if (employeeId) {
    query = { employee: employeeId };
  }

  try {
    const overdueTasks = await Task.find({
      endDate: { $lt: new Date() },
      status: "pending",
    });

    await Promise.all(
      overdueTasks.map(async (task) => {
        task.status = "late";
        await task.save();
      })
    );

    const tasks = await Task.find(query).populate("employee");
    return new Response(
      JSON.stringify({
        success: true,
        data: tasks,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await connectToDB();

  const id = request.nextUrl.searchParams?.get("id");
  const dataFromBody = await request.json();

  try {
    const taskToUpdate = await Task.findById(id);

    if (!taskToUpdate) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Task not found.",
        }),
        { status: 404 }
      );
    }

    if (dataFromBody.status === "complete") {
      const pointsValue = dataFromBody.points;

      const newPoint = new Point({
        employee: taskToUpdate.employee,
        points: pointsValue,
        source: "Task Completion",
      });

      await newPoint.save();
    }

    Object.assign(taskToUpdate, dataFromBody);
    const updatedTask = await taskToUpdate.save();

    return new Response(
      JSON.stringify({
        success: true,
        data: await updatedTask.populate("employee"),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  await connectToDB();
  const id = request.nextUrl.searchParams?.get("id");

  try {
    const deletedTask = await Task.findByIdAndRemove(id);

    if (!deletedTask) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Task not found.",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {},
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
