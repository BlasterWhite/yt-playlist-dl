# YouTube Playlist Downloader

This script allows you to download all the videos from a YouTube playlist and save them as MP3 files.
How to Use

1. Clone the Repository
    ```bash
    git clone https://github.com/BlasterWhite/yt-playlist-dl.git
    ```
2. Install Dependencies
    ```
    npm install
    ```
3.  the Script

   Execute the following command:
   ```bash
   node index.js <playlistUrl> <savePath>
   ```
  - `<playlistUrl>`: The URL of the YouTube playlist you want to download.
  - `<savePath>`: The directory where you want to save the downloaded MP3 files(relative path).

## Example:

```bash
 node index.js https://www.youtube.com/playlist?list=PLNoe1u3iBkC9crGcSNxfvBvYvgj-5lgFf output
```
 Wait for the Script to Finish

 The script will start downloading the videos one by one. Once a video is downloaded, it will be saved as an MP3 file in the specified directory.

## Important Notes

Make sure you have Node.js and npm installed on your system.
Ensure that you have proper permissions to create directories and files in the specified <savePath>.
