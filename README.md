# **MY BLOG CLI**

A command-line interface (CLI) application for managing a simple blog. With this program, users can create, view, edit, and delete blog posts. The posts are stored persistently in a JSON file.


## **Features**

- Create Blog Post: Add a new blog post with a title and content.

- View All Blog Posts: Display all saved blog posts in the console.

- Edit Blog Post: Modify the title and/or content of an existing blog post.

- Delete Blog Post: Remove a specific blog post by its number.

- Storage: Blog posts are saved in a JSON file (*myBlogPosts.json*) for data persistence.


## **Prerequisites**

Ensure you have the following installed:

*Node.js (v14 or later)*


## **Installation**

Clone this repository or download the source code.

Navigate to the project directory:
*cd blog-cli*

Ensure all required modules are available. The program uses the built-in fs and readline modules, so no additional dependencies are needed.


## **Usage**

Run the application using Node.js:
*node blog-cli.js*

Follow the on-screen prompts to interact with the blog menu:

1. Create a new Blog Post: Enter a title and content for the post.

2. View all Blog Posts: Display all saved blog posts.

3. Edit a Blog Post: Choose a post by its number and modify the title or content.

4. Delete a Blog Post: Choose a post by its number to delete.

5. Exit: Quit the application.


## **File Structure**

- blog-cli.js: Main program file containing the application logic.

- myBlogPosts.json: JSON file where all blog posts are stored persistently.


## **Troubleshooting**

View Blog Posts Not Updating: Ensure the *viewBlogPost* function reloads the blog posts from *myBlogPosts.json*.

JSON File Not Found: If *myBlogPosts.json* is missing, the program will create it automatically.


## **Contributing**

Feel free to fork the repository and submit pull requests for new features or bug fixes. Thank you!
