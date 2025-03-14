package com.yash.project_management.service;

import com.yash.project_management.model.Comment;
import com.yash.project_management.model.Issue;
import com.yash.project_management.model.User;
import com.yash.project_management.repository.CommentRepository;
import com.yash.project_management.repository.IssueRepository;
import com.yash.project_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issueOptional = issueRepository.findById(issueId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(issueOptional.isEmpty()){
            throw new Exception("issue not found with id "+issueId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id "+userId);
        }
        Issue issue = issueOptional.get();
        User user = userOptional.get();
        Comment comment = new Comment();
        comment.setIssue(issue);
        comment.setUser(user);
        Comment savedComment = commentRepository.save(comment);
        issue.getComments().add(savedComment);
        return savedComment;

    }



    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(commentOptional.isEmpty()){
            throw new Exception("comment not found with id "+commentId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id "+userId);
        }
        Comment comment = commentOptional.get();
        User user = userOptional.get();
        if(comment.getUser().equals(user)){
            commentRepository.delete(comment);
        }
        else{
            throw new Exception("user does not have permission to delete this comment");
        }
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) throws Exception{
        return commentRepository.findByIssueId(issueId);
    }
}
