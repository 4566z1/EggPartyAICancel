
// com.netease.party.xyaz

// 最大音量
var max_vol = 10000

function main() {
    Java.perform(function () {
        Java.choose("dalvik.system.PathClassLoader", {
            onMatch: function (instance) {
                var factory = Java.ClassFactory.get(instance)
                try {
                    var PluginCCMini = factory.use("com.netease.cc.voice.CCVoiceEngine")
                    PluginCCMini.ControlMini.implementation = function (str, i) {
                        if (str.indexOf("set-ns-level") > 0) {
                            str = "{\"type\":\"enable-ai-ns\",\"enable\":0}"
                            i = 0;
                            console.log("[HOOK] enable-ai-ns Finish!");
                        }else if(str.indexOf("enable-fading") > 0){
                            str = ''
                            i = 0
                            console.log("[HOOK] enable-fading Finish!");
                        }
                        else if(str.indexOf("set-ec-level") > 0){
                            str = "{\"type\":\"enable-aec3\",\"enable\":0}"
                            i = 0;
                            console.log("[HOOK] enable-aec3 Finish!");
                        }
                        else if(str.indexOf("set-playback-vol") > 0){
                            var session_id = JSON.parse(str)["session-id"]
                            str = "{\"type\":\"set-playback-vol\",\"session-id\":" + session_id + ",\"percent\":" + max_vol + "}"
                            i = 0
                            console.log("[HOOK] set-playback-vol session_id:" + session_id + " Finish!");
                        }
                        return this.ControlMini(str, i);
                    };
                } catch (error) {
                    console.log(error)
                }
            },
            onComplete: function () {
                
            }
        })
    })
}

setImmediate(main)