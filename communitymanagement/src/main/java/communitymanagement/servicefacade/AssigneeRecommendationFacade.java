package communitymanagement.servicefacade;

import java.util.List;

import communitymanagement.entity.AssigneeEntity;

public interface AssigneeRecommendationFacade {
	
    List<AssigneeEntity> getTicketAssineeRecommendation(int issueCategoryId);

}
