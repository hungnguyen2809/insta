package com.hungnguyen2809.insta;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Insta";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {

    public MainActivityDelegate(Activity activity, @Nullable String mainComponentName) {
      super(activity, mainComponentName);
    }

    public MainActivityDelegate(ReactActivity activity, @Nullable String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected void loadApp(String appKey) {
      RNBootSplash.init(getPlainActivity()); // <- initialize the splash screen
      super.loadApp(appKey);
    }
  }
}
