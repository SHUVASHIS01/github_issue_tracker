# 🌟 Welcome To (সহজ সরল সিম্পল) Assignment - 5

# **📅 Deadline For 60 marks:** 9th March, 2026 (11:59 pm ⏱️)  
#  📅 No Deadline For 50 marks  
# **📅 Deadline For 30 marks:** Any time after 9th March.

---

# Assignment-05: GitHub Issues Tracker


### **API Endpoints:**
###  **All Issues:** 
  - https://phi-lab-server.vercel.app/api/v1/lab/issues 


###  **Single Issue:**
   - https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}

   - Example: https://phi-lab-server.vercel.app/api/v1/lab/issue/33


###  **Search Issue:** https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}

   - Example:  https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications


---

## 📝 Main Requirements

## 🎨 Design Part

## Login Page
- Create a login page containing a logo, title, and sub-title
- Below that, there will be 2 inputs, a sign-in button, and a demo credential to sign in. Follow the Figma for this page 
- Styled as per Figma

## Main Page: 

### Navbar: 

- Navbar with website logo/name on the left
- Search input and button on the right

### Tab Section like Figma: 

- 3 tab ( All, Open, Closed) at the top of this section.(**All**, **Open**, **Closed**)

- Below the tab, there will be an icon, the issue count, some text on the left, and an open and closed marker on the right

- Responsiveness: The website should be responsive for mobile devices. It is totally up to you. 


--- 


## ⚙️ Functionalities
- In login page, there will be default admin credentials (username, password). You need to sign in using these credentials.

- Load all issues and display as per Figma

- On clicking on an open or closed tab, it will load the issues data of the related tab and show it in a display-like card in a 4-column layout like Figma. By default, it will show all data 

- Each card shows:
  - Title
  - Description
  - Status 
  - Author
  - Priority
  - Label
  - CreatedAt
- Clicking on an issue  card will open a modal and show all the information about that Issue. 

### 🚀 Challenges


- Show the card Top border based on their category(open, closed), open card will have Green Boder, closed card will have a purple border on top. 

- Loading spinner on data load

- Show active button on changing category names

- Implement Search Functionality and 8 meaningful github commit.  

- Create a readme file and answer this question on your own. Don’t copy-paste from Google or any AI chatbot. 
    - 1️⃣ What is the difference between var, let, and const?
      **Answer:** `var` is function-scoped and allows redeclaration, often leading to unexpected behavior. `let` is block-scoped and allows reassignment but not redeclaration within the same scope. `const` is also block-scoped but prevents both reassignment and redeclaration, making it ideal for values that shouldn't change.
    - 2️⃣ What is the spread operator (...)?
      **Answer:** The spread operator `...` allows expanding elements of an iterable (like an array or string) or object properties into places where multiple elements or key-value pairs are expected. It is extremely useful for copying arrays, merging objects, or passing elements as individual function arguments.
    - 3️⃣ What is the difference between map(), filter(), and forEach()?
      **Answer:** 
      - `map()` iterates over an array, applies a callback function to each element, and returns a new array with the transformed results.
      - `filter()` iterates over an array and returns a new array containing only the elements that pass a specific condition.
      - `forEach()` simply executes a function on every item in an array but does not return a new array (it returns `undefined`), making it useful mainly for side effects.
    - 4️⃣ What is an arrow function?
      **Answer:** An arrow function is a more concise syntax for writing function expressions in ES6 (`() => {}`). Unlike regular functions, arrow functions do not have their own `this` binding; instead, they inherit `this` from the surrounding lexical scope.
    - 5️⃣ What are template literals?
      **Answer:** Template literals are strings enclosed in backticks (\`) instead of regular quotes. They allow for easy string interpolation and embedding of expressions using the `${expression}` syntax, as well as native support for multi-line strings without needing newline characters.


---

## 🛠️ Technology Stack

- **HTML**
- **CSS** (Vanilla/Tailwind/DaisyUI)
- **JavaScript** (Vanilla)

---

## 🔑 Demo Credentials

```text
Username: admin
Password: admin123
```


---

### Optional: 
 - No need to show status: Open, Closed styles On modals. 
 - No Need to show icon on labels 
 - No need to apply styles on Priority 
--- 


## 📤 What to submit

- **GitHub Repository Link:**
- **Live Site Link:**

---


