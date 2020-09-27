package communitymanagement.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import communitymanagement.entity.SimpleResponse;

@RestController
public class TestController {
//	@GetMapping("/greeting")
//	public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name,
//			Model model) {
//		model.addAttribute("name", name);
//		return "greeting";
//	}

	@PostMapping("/greeting/{example_id}")
	public SimpleResponse greetingPost(@RequestBody String aa, @PathVariable("example_id") int exampleId,
			@RequestParam(value = "key", defaultValue = "") String key) {

		String msg = Integer.toString(exampleId) + ":" + key + ":" + aa;
		SimpleResponse simpleResponse = SimpleResponse.builder().status("200").message(msg).build();
		return simpleResponse;

	}

}
