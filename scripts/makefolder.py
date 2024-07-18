import os

# Path where you want to create the folders
folder_path = 'C:\\Users\\16178\\Pictures\\SREFS'

# Path of the text file containing the folder names
file_path = 'C:\\Users\\16178\\Pictures\\SREFS\\folder_names.txt'  # Update this to the correct file path if different

# Create the folder if it doesn't exist
if not os.path.exists(folder_path):
    os.makedirs(folder_path)

# Open the text file and read folder names
with open(file_path, 'r') as file:
    folder_names = file.readlines()

for folder_name in folder_names:
    folder_name = folder_name.strip()  # Remove any extra whitespace
    if folder_name:  # Check if the folder name is not empty
        new_folder_path = os.path.join(folder_path, folder_name)
        if not os.path.exists(new_folder_path):
            os.makedirs(new_folder_path)
            print(f"Folder created: {new_folder_path}")
        else:
            print(f"Folder already exists: {new_folder_path}")
