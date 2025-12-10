# 📝 Implementation Details

## **1. What information will your users need to input to make your software function?**
1. Goal title  
2. Goal description  
3. SMART criteria fields (Specific, Measurable, Achievable, Relevant, Time-bound)  
4. Plan steps  
5. Task title  
6. Task reminder time (optional)  
7. Email  
8. Password  

---

## **2. What information would your system need to provide to your users?**
1. Goal title + description  
2. All SMART fields  
3. The plan as a list of tasks  
4. Whether each plan/goal is **private or public**  
5. Reminder time  
6. Email reminders for upcoming tasks  

---

## **3. What pages could you have, and which endpoints will you need to use?**

### **Authentication**
1. Login page  
2. Registration page  

### **Planning**
1. Dashboard (goal and plans)  
2. Goal Creation page  

### **Review**
1. Plan view page  

### **Endpoints**
1. `POST /login`  
2. `POST /register`  
3. `POST /goal`  
4. `GET /goal`  
5. `PUT /goal`  
6. `POST /task`  
7. `GET /tasks`  
8. `PUT /task`  

---

## **4. What entities/resources/data will we have in the system?**
- Users  
- Tasks  
- Goals  
- Plan (Goal and tasks)  
- Reminders  

---

## 5. What information do we need to store to achieve the goals?  
Define the collections in the database.
1. *(To be completed — database schema for users, goals, tasks, plan, reminders)*  

---

## **6. What are we going to need to expose to the React app?**

1. Are you going to have an endpoint for a resource?  
- N/a
2. Do you need calculation or aggregation between the database and the frontend?  
- N/a
3. What will the REST API look like?
- N/a

---

## 7. We sketched out the page previously. Do we need to review it?  
How could we decompose them into separate components to work on?
- N/a
---

## **8. Identify the “edges” between different tasks**  
(e.g., agreements between backend and frontend on API shapes or props passed between parent and child components)
- N/a
