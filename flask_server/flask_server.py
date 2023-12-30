import os
from PIL import Image
import face_recognition
from io import BytesIO
from flask  import Flask, request, jsonify

app = Flask(__name__)



@app.route("/face_recognition", methods=["POST"])
def face_recognition_endpoint():
    data = request.get_json()
    print(data)
    user_picture_name = data.get('data', '')
    if not user_picture_name:
        return jsonify({"error": 'No Picture found in folder'})
    
    
    image_path = "./uploads/" + user_picture_name
    unique_id = get_face_locations(image_path)

    return jsonify({"unique_id": unique_id})


def get_face_locations(image_url):
 
    face_locations = face_recognition.face_locations(face_recognition.load_image_file(image_url))

    if face_locations:
        for i, face_location in enumerate(face_locations):
            top, right, bottom, left = face_location
            unique_id = f"t{top}r{right}b{bottom}l{left}"
            return unique_id
    else:
        return "Error Occured - No faces found in the image."


if __name__ == "__main__":
    app.run()
