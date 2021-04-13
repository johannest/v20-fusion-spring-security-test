package com.example.application.views.about;

import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

@Route(value = "about")
@PageTitle("About")
@Tag("about-view")
@JsModule("./views/about/about-view.ts")
public class AboutView extends LitTemplate {

    // This is the Java companion file of a design
    // You can find the design file inside /frontend/views/

    public AboutView() {
    }
}
