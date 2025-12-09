import { z } from "zod";
export const goalSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Please add title",
    })
    .max(500, "Title is too long (max 500 characters)."),
  specific: z
    .string()
    .min(10, {
      message:
        "Please be more specific. A good goal is at least 10 characters long.",
    })
    .max(500, "Title is too long (max 500 characters)."),
  measurable: z
    .string()
    .max(500, "Title is too long (max 500 characters).")
    .optional(),

  achievable: z
    .string()
    .max(500, "Title is too long (max 500 characters).")
    .optional(),
  relevant: z
    .string()
    .max(500, "Title is too long (max 500 characters).")
    .optional(),
  time_bound: z.date().optional().nullable(),
});

//Note for the team
//Why this?
//You should define a validation schema for almost every piece of data your application receives from an external source, especially from a user.
// The Rule of Thumb: If a User Can Type It, Validate It.
//in our "PlanYourFuture" project where we need to create a validation schema,
// User Registration (authSchema.js or userSchema.js)
// Data: email, password, fullName
// Rules: Is the email a valid email format? Is the password at least 8 characters long? Is the name not empty?
// User Login (authSchema.js)
// Data: email, password
// Rules: This schema can be simpler. It just needs to check that the fields aren't empty and the email is in a valid format before sending it to the server.
// Creating/Editing a Goal (goalSchema.js)
// You've already done this one perfectly!
// Creating/Editing a Task (taskSchema.js)
// Data: title
// Rules: Is the task title empty? You'll probably want to require a title that's not just whitespace.
// Mentor Feedback (feedbackSchema.js)
// Data: mentor_name, feedback_text
// Rules: You'll want to ensure both the mentor's name and their feedback are not empty before the form can be submitted.
