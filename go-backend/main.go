package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
)

type LoginJson struct {
	Unique_id string `json:"unique_id"`
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the form data, including the file
	err := r.ParseMultipartForm(10 << 20) // 10 MB is the max file size in this example
	if err != nil {
		http.Error(w, fmt.Sprintf("Error parsing form: %v", err), http.StatusBadRequest)
		return
	}

	// Get the file from the request
	file, handler, err := r.FormFile("file") // "file" should be the name attribute of your file input field
	if err != nil {
		http.Error(w, "Error retrieving file from form: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Create a buffer to store the file content
	var buf bytes.Buffer
	_, err = io.Copy(&buf, file)
	if err != nil {
		http.Error(w, "Error copying file content to buffer: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a new multipart writer to construct the request with the file
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	// Add the file to the request
	part, err := writer.CreateFormFile("file", handler.Filename)
	if err != nil {
		http.Error(w, "Error creating form file: "+err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = io.Copy(part, &buf)
	if err != nil {
		http.Error(w, "Error copying file to form file: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Add any other form fields if needed
	// writer.WriteField("key", "value")

	// Close the multipart writer to finalize the request
	writer.Close()

	// Make the POST request to the desired endpoint
	endpoint := "http://127.0.0.1:5000/face_recognition"
	resp, err := http.Post(endpoint, writer.FormDataContentType(), body)
	if err != nil {
		http.Error(w, "Error making POST request: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	jsonResponse := &LoginJson{}
	err = json.NewDecoder(resp.Body).Decode(&jsonResponse)
	if err != nil {
		http.Error(w, "Error decoding JSON response: "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(jsonResponse)
}

func main() {
	http.HandleFunc("/login", handleLogin)
	fmt.Println("Listening on port 8080")
	log.Println(http.ListenAndServe(":8080", nil))
}
