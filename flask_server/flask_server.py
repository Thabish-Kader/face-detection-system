import os
from PIL import Image
import face_recognition
from io import BytesIO
from flask  import Flask, request, jsonify

app = Flask(__name__)

@app.route("/face_recognition", methods=["POST"])
def face_recognition_endpoint():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files["file"]

    if file.filename == '':
        return jsonify({"error": "No selected file"})
    
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)
    
    image_path = "./uploads/" + file.filename
    unique_id = get_face_locations(image_path)

    os.remove(file_path)

    return jsonify({"unique_id": unique_id})

def get_face_locations(image_url):
    # Find all face locations in the image
    face_locations = face_recognition.face_locations(face_recognition.load_image_file(image_url))
    # # Print the face locations
    if face_locations:
        for i, face_location in enumerate(face_locations):
            top, right, bottom, left = face_location
            unique_id = f"t{top}r{right}b{bottom}l{left}"
            return unique_id
    else:
        return "Error Occured - No faces found in the image."


if __name__ == "__main__":
    app.run()
