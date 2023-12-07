const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  function getLearnerData(course, assignmentGroup, submissions) {
    const learnerData = {};
  
    function processSubmission(submission, assignment) {
      const learnerId = submission.learner_id;
      const assignmentId = submission.assignment_id;
      const score = submission.submission.score;
      const submittedAt = new Date(submission.submission.submitted_at);
      const dueAt = new Date(assignment.due_at);
      const pointsPossible = assignment.points_possible;
  
      // Check if the assignment is valid
      if (assignment.course_id !== course.id || typeof pointsPossible !== "number" || pointsPossible <= 0) {
        console.error(`Invalid assignment for learner ${learnerId} and assignment ${assignmentId}. Skipping.`);
        return;
      }
  
      // Skip assignments that are not yet due
      if (submittedAt > dueAt) {
        console.error(`Assignment ${assignmentId} for learner ${learnerId} is not yet due. Skipping.`);
        return;
      }
  
      // Initialize learner data if not exists
      if (!learnerData[learnerId]) {
        learnerData[learnerId] = { id: learnerId, avg: 0, individualScores: {} };
      }
  
      // Calculate and store individual score
      learnerData[learnerId].individualScores[assignmentId] = score / pointsPossible;
    }
  
    // Process each submission
    submissions.forEach((submission) => {
      const assignmentId = submission.assignment_id;
      const assignment = assignmentGroup.assignments.find((assignment) => assignment.id === assignmentId);
      if (assignment) {
        processSubmission(submission, assignment);
      } else {
        console.error(`Assignment with ID ${assignmentId} not found in the AssignmentGroup. Skipping.`);
      }
    });
  
    // Calculate averages for each learner
    for (const learnerId in learnerData) {
      const learner = learnerData[learnerId];
      const assignmentCount = Object.keys(learner.individualScores).length;
      const totalScore = Object.values(learner.individualScores).reduce((sum, score) => sum + score, 0);
      learner.avg = assignmentCount > 0 ? totalScore / assignmentCount : 0;
    }
  
    return Object.values(learnerData);
  }
  
  // Get the result and log it to the console
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result)