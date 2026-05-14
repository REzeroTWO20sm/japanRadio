import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

COUNTER_FILE = "views.txt"


def get_views():
    try:
        with open(COUNTER_FILE, "r") as file:
            return int(file.read().strip() or 0)
    except (FileNotFoundError, ValueError):
        return 0


def increment_views():
    views = get_views() + 1
    with open(COUNTER_FILE, "w") as file:
        file.write(str(views))
    return views


@app.websocket("/ws")
async def take_ping_give_views(websocket: WebSocket):
    await websocket.accept()

    views = increment_views()
    await websocket.send_text(f"{views}")

    async def send_updates():
        while True:
            await asyncio.sleep(1)
            try:
                current_views = get_views()
                await websocket.send_text(f"{current_views}")
            except:
                break

    task = asyncio.create_task(send_updates())

    try:
        while True:
            data = await websocket.receive_text()

            if data == "ping":
                views = get_views()
                await websocket.send_text(f"{views}")
            elif data == "increment":
                views = increment_views()
                await websocket.send_text(f"{views}")
            else:
                await websocket.send_text(f"{data}")
    except WebSocketDisconnect:
        task.cancel()
        print("Client disconnected")
