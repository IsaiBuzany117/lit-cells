export const changeStatus = (ctx, task) => {
    console.log(ctx)
    console.log(task)
    task.done = !task.done
    console.log(task)
    ctx.requestUpdate();
}