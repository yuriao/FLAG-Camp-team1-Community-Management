package communitymanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.model.Ticket;
import communitymanagement.servicefacade.DashboardServiceFacadeImpl;

@RestController
public class DashboardController {

	@Autowired
    private DashboardServiceFacadeImpl dashboardServiceFacadeImpl;

    @GetMapping("/dashboard/resident")
    public List<Ticket> getTicketsAsResident() {
        return dashboardServiceFacadeImpl.getTickets("resident");
    }

    @GetMapping("/dashboard/manager")
    public List<Ticket> getTicketsAsManager() {
        return dashboardServiceFacadeImpl.getTickets("manager");
    }

    @GetMapping("/dashboard/staff")
    public List<Ticket> getTicketsAsStaff() {
        return dashboardServiceFacadeImpl.getTickets("staff");
    }
}

