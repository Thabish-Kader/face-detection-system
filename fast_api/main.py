from fastapi import FastAPI, HTTPException
from typing import Dict
import os
from hashlib import md5
from fastapi.responses import JSONResponse
import face_recognition

app = FastAPI()

def generate_image_id(image_path):
    img = face_recognition.load_image_file(image_path)
    face_encodings = face_recognition.face_encodings(img)
    if not face_encodings:
        raise ValueError("No face found in the image")

    hasher = md5()
    for face_encoding in face_encodings:
        hasher.update(face_encoding.tobytes())
    face_id = hasher.hexdigest()

    return face_id

def process_images(folder_path):
    image_list = []

    for filename in os.listdir(folder_path):
        if filename.endswith(('.jpg', '.jpeg', '.png')):  
            image_path = os.path.join(folder_path, filename)

            try:
                face_id = generate_image_id(image_path)
                image_data = {"filename": filename, "face_id": face_id}
                image_list.append(image_data)

            except ValueError as e:
                print(f"Error processing {filename}: {e}")

    return image_list

@app.get("/process_images")
async def read_item():
    try:

        folder_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "uploads")
        face_ids = process_images(folder_path)

        if not face_ids:
            return JSONResponse(content={"message": "No face found in any image"}, status_code=200)

        return JSONResponse(content=face_ids, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
