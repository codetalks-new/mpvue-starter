import eventBus from "@/eventBus";
import * as mpex from "@/mpex";
import PageUrls from "@/pages";
import AppEvents from "@/events";
import { settings } from "@/storage";
import Log from "@/logbox";
/**
 * Root Component
 */

export default {
  created() {
    // 注册全局事件影响
    // Log.info("autoLogin ", settings.autoLogin);
  }
};
