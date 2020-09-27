package communitymanagement.controller;

import communitymanagement.model.Ticket;
import communitymanagement.servicefacade.DashboardServiceFacadeImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DashboardController {

    @Autowired
    private DashboardServiceFacadeImpl dashboardServiceFacadeImpl;

    @GetMapping("/dashboard/resident")
    public List<Ticket> getTicketsAsResident(@RequestParam(value = "userId", defaultValue = "100") int userId) {
        // wait to be authenticated
        return dashboardServiceFacadeImpl.getTickets("resident", userId);
    }

    @GetMapping("/dashboard/manager")
    public List<Ticket> getTicketsAsManager(@RequestParam(value = "userId", defaultValue = "100") int userId) {
        // wait to be authenticated
        return dashboardServiceFacadeImpl.getTickets("manager", userId);
    }

    @GetMapping("/dashboard/staff")
    public List<Ticket> getTicketsAsStaff(@RequestParam(value = "userId", defaultValue = "100") int userId) {
        // wait to be authenticated
        return dashboardServiceFacadeImpl.getTickets("staff", userId);
    }
}

