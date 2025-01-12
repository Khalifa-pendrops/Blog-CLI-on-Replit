import readline from "readline";
import fs from "fs";

const myBlogFile = "myBlogPosts.json";

const getMyPosts = () => {
  try {
    if (fs.existsSync(myBlogFile)) {
      const data = fs.readFileSync(myBlogFile, "utf8");
      return JSON.parse(data || "[]");
    }
  } catch (error) {
    console.error("Error reading file: ", error);
  }
  return [];
};

const saveMyPosts = (posts) => {
  fs.writeFileSync(myBlogFile, JSON.stringify(posts, null, 2), "utf8");
};

let blogPosts = getMyPosts();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userOptions = (option) => {
  switch (option) {
    case "1":
      createBlogPost();
      break;
    case "2":
      viewBlogPost();
      break;
    case "3":
      editBlogPost();
      break;
    case "4":
      deleteBlogPost();
      break;
    case "5":
      console.log("\nAlert 🔊: Exiting Blog Menu now...");
      rl.close();
      break;
    default:
      console.log("\nUnknown option. Please try again.");
      blogMenu();
  }
};

const blogMenu = () => {
  console.log(`
        My Blog CLI
        1. Create a new Blog Post
        2. View all Blog Posts
        3. Edit a Blog Post
        4. Delete a Blog Post
        5. Exit
        `);
  rl.question(
    "Choose an option from the list of options (1 - 5): ",
    (option) => {
      userOptions(option);
    },
  );
};

const createBlogPost = () => {
  rl.question("Enter a title for your Post: ", (title) => {
    rl.question("Enter the content of your Post: ", (content) => {
      const createdAt = new Date().toLocaleString();
      blogPosts.push({ title, content, createdAt });
      saveMyPosts(blogPosts);
      console.log("\nAlert 🔊: New post added!");
      blogMenu();
    });
  });
};

const viewBlogPost = () => {
  blogPosts = getMyPosts();
  console.log("\nMY BLOG POSTS");
  if (blogPosts.length === 0) {
    console.log(
      "\nAlert 🔊: Ooops! Seems like there is no Blog Post at the moment. Please create a Post.",
    );
  } else {
    blogPosts.forEach(({ title, content, createdAt }, index) => {
      console.log(`\nPost #${index + 1}`);
      console.log(`Title: ${title}`);
      console.log(`Content: ${content}`);
      console.log(`Created At: ${createdAt}`);
    });
  }
  blogMenu();
};

const editBlogPost = () => {
  if (blogPosts.length === 0) {
    console.log(
      "\nAlert 🔊: Sorry, there's no Post to edit. Kindly select a Post.",
    );
    return blogMenu();
  }

  rl.question(
    "Please enter the Post number you would like to edit: ",
    (number) => {
      const index = parseInt(number, 10) - 1;
      if (isNaN(index)) {
        console.log(
          "\nAlert 🔊: Invalid input. Please enter a valid Post number.",
        );
        return editBlogPost();
      }

      if (index >= 0 && index < blogPosts.length) {
        const post = blogPosts[index];
        console.log(`\nEditing Post #${index + 1}`);
        console.log(`Current Title: ${post.title}`);
        console.log(`Current Content: ${post.content}`);

        rl.question(
          "Please enter new title (leave blank if you want to keep the current title): ",
          (newTitle) => {
            rl.question(
              "Please enter new content (leave blank if you want to keep the current content): ",
              (newContent) => {
                blogPosts[index] = {
                  ...post,
                  title: newTitle || post.title,
                  content: newContent || post.content,
                };
                saveMyPosts(blogPosts);
                console.log("\nAlert 🔊: Post updated successfully!");
                blogMenu();
              },
            );
          },
        );
      } else {
        console.log("\nAlert 🔊: Invalid Blog Post number.");
        blogMenu();
      }
    },
  );
};

const deleteBlogPost = () => {
  if (blogPosts.length === 0) {
    console.log(
      "\nAlert 🔊: Ooops! There's no Blog Post to delete. Please enter a Blog Post number to delete.",
    );
    return blogMenu();
  }
  rl.question("Enter the Post number you want to delete: ", (number) => {
    const index = parseInt(number, 10) - 1;
    if (isNaN(index)) {
      console.log(
        "\nAlert 🔊: Invalid input. Please enter a valid Post number.",
      );
      return editBlogPost();
    }
    if (index >= 0 && index < blogPosts.length) {
      blogPosts.splice(index, 1);
      saveMyPosts(blogPosts);
      console.log("\nAlert 🔊: Post has been deleted successfully!");
    } else {
      console.log(
        "\nAlert 🔊: The Post number is invalid. Please enter a valid Post number.",
      );
    }
    blogMenu();
  });
};

blogMenu();
