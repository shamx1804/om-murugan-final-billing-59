package com.ommurugan.autoworks;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Additional plugins can be added here
        // this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
        //     add(SomePlugin.class);
        // }});
    }
}