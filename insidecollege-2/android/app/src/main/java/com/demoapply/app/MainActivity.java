package com.demoapply.app;

import android.graphics.Bitmap;
import android.os.Bundle;

import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {

  private WebView mywebView;
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});


    mywebView=(WebView) findViewById(R.id.webview);
    mywebView.setWebViewClient(new WebViewClient());
    mywebView.loadUrl("https://coupon.technovedant.com/");
    WebSettings webSettings=mywebView.getSettings();
    webSettings.setJavaScriptEnabled(true);



  }

  public class mywebClient extends WebViewClient{
    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon){
      super.onPageStarted(view,url,favicon);
    }
    @Override
    public boolean shouldOverrideUrlLoading(WebView view,String url){
      view.loadUrl("https://intergalatic8.wordpress.com/");
      return true;
    }
  }
  @Override
  public void onBackPressed(){
    if(mywebView.canGoBack()) {
      mywebView.goBack();
    }
    else{
      super.onBackPressed();
    }
  }
}
