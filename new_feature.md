Question Categories & Difficulty Levels – Let users choose different categories or difficulty levels before starting the quiz.
I attempted to add a feature that allows users to choose a category and difficulty level before starting the quiz. This would allow for a more personalized experience, where users could select topics they are interested in and choose an easy, medium, or hard difficulty.

This feature is a common functionality in quiz applications and should be possible using only frontend technologies:
No backend required – The questions and categories could be stored in a JavaScript object.
Dynamic rendering – Frontend logic should be able to filter and display only the selected questions based on the user’s choice.
User interactivity – The UI could include dropdowns or buttons for category and difficulty selection before the quiz starts.
Since all the quiz logic is already managed on the frontend, adding a selection screen before the quiz starts should be a reasonable.

How It Was Supposed to Work:
User selects a category and difficulty level from a dropdown menu or buttons before starting the quiz.
The quiz filters questions based on the chosen category and difficulty.
The selected questions are loaded dynamically and displayed one by one as the user progresses through the quiz.
The quiz tracks the user’s score as usual and shows the results at the end.

How ChatGPT Failed to Implement It:
ChatGPT failed to implement this because it didn’t set up a full question bank for different categories and difficulty levels. The filtering logic wasn’t fully built, so the quiz either ignored selections or showed all questions. The category selection screen didn’t work right, and the quiz sometimes ended up empty or broken.