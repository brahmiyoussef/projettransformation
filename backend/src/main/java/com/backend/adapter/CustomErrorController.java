package com.backend.adapter;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Map<String, Object> model) {
        // Custom error handling logic
        Integer statusCode = (Integer) request.getAttribute("jakarta.servlet.error.status_code");
        model.put("statusCode", statusCode);
        return "error"; // Return the name of the view to be rendered (e.g., an error.html template)
    }

    public String getErrorPath() {
        return "/error";
    }
}
