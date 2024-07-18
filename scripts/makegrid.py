import os
from PIL import Image

def sort_key(filename):
    if "hyper_realistic_upper_body_water_nymph" in filename:
        return 0  # Girl image
    elif "A_beautiful_beach_with_mountains" in filename:
        return 1  # Beach image
    elif "2_color_screen_print_of_shiba_inu" in filename:
        return 2  # Dog image
    elif "Dalle_aint_got_nothin_on_this" in filename:
        return 3  # Wildcard image
    return 4  # In case there's an unexpected filename

def create_image_grid(images, output_folder, base_name):
    # Sort images based on the predefined key
    images.sort(key=lambda x: sort_key(x))
    images = [Image.open(image) for image in images]
    widths, heights = zip(*(i.size for i in images))

    total_width = max(widths) * 2
    total_height = max(heights) * 2

    new_im = Image.new('RGB', (total_width, total_height))

    # Arrange images in 2x2 grid
    positions = [(0,0), (max(widths), 0), (0, max(heights)), (max(widths), max(heights))]
    for im, pos in zip(images, positions):
        new_im.paste(im, pos)
    
    # Resize to 1024x1024 using the LANCZOS resampling filter
    new_im = new_im.resize((1024, 1024), Image.Resampling.LANCZOS)
    
    # Save PNG
    png_path = os.path.join(output_folder, f'{base_name}.png')
    new_im.save(png_path, 'PNG')
    print(f'Saved PNG: {png_path}')

    # Save JPEG with quality level 70 (roughly 7-8 out of 10)
    jpeg_path = os.path.join(output_folder, f'{base_name}.jpg')
    new_im.save(jpeg_path, 'JPEG', quality=70)
    print(f'Saved JPEG: {jpeg_path}')

base_path = 'C:/Users/16178/Pictures/SREFS/batch_1'

for folder in os.listdir(base_path):
    folder_path = os.path.join(base_path, folder)
    if os.path.isdir(folder_path):
        images = []
        # Gather images in the specific order
        for filename in sorted(os.listdir(folder_path)):
            if filename.endswith('.png'):
                images.append(os.path.join(folder_path, filename))
        create_image_grid(images, base_path, folder)
