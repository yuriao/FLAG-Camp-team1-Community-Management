package communitymanagement.service;

import communitymanagement.dao.WorkAssignmentDao;
import communitymanagement.model.WorkAssignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkAssignmentService {

    @Autowired
    private WorkAssignmentDao workAssignmentDao;

    public void addWorkAssignment(WorkAssignment workAssignment) {
        workAssignmentDao.addWorkAssignment(workAssignment);
    }

    public List<WorkAssignment> getWorkAssignmentByIssue(String issueType) {
        return workAssignmentDao.getWorkAssignmentByIssue(issueType);
    }

    public void deleteWorkAssignment(int workAssignmentId) {
        workAssignmentDao.deleteWorkAssignment((workAssignmentId));
    }
}
