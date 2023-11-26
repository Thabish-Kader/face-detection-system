package main

import (
	"fmt"
	"os/exec"
)

func main() {

	cmd := exec.Command("python3", "face_recognition_script.py")
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println("Python script output:", string(output))
}
