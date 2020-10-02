package communitymanagement;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//Thanks! https://stackoverflow.com/questions/39331929/spring-catch-all-route-for-index-html/42998817#42998817
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
      registry.addViewController("/{spring:\\w+}")
            .setViewName("forward:/");
      registry.addViewController("/**/{spring:\\w+}")
            .setViewName("forward:/");
      registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
            .setViewName("forward:/");
  }
}