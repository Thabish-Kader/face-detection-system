import requests
from PIL import Image
import face_recognition
from io import BytesIO

def main():
    image_url = "./face2.jpg"

    # Find all face locations in the image
    face_locations = face_recognition.face_locations(face_recognition.load_image_file(image_url))

    # # Print the face locations
    if face_locations:
        for i, face_location in enumerate(face_locations):
            top, right, bottom, left = face_location
            print(f"Face {i + 1}: Top: {top}, Right: {right}, Bottom: {bottom}, Left: {left}")
    else:
        print("No faces found in the image.")

if __name__ == "__main__":
    main()
