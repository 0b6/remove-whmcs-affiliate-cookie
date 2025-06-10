// background.js for Manifest V3

const RULE_ID = 1;

const newRule = {
  id: RULE_ID,
  priority: 1,
  action: {
    // 动作类型：修改响应头
    type: "modifyHeaders",
    responseHeaders: [
      {
        // 操作：移除名为 "set-cookie" 的响应头
        "operation": "remove",
        "header": "set-cookie"
      }
    ]
  },
  condition: {
    // 条件：仅当响应头中存在匹配的 Set-Cookie 时才执行此规则
    responseHeaders: [
      {
        "header": "set-cookie",
        // 使用正则表达式匹配包含 "WHMCSAffiliateID=" 的值
        "valuePattern": "WHMCSAffiliateID=.*"
      }
    ],
    // 在这些类型的资源上应用规则
    resourceTypes: ["main_frame", "sub_frame"]
  }
};

// 更新动态规则
chrome.declarativeNetRequest.getDynamicRules(rules => {
  const existingRuleIds = rules.map(rule => rule.id);
  const rulesToRemove = existingRuleIds.includes(RULE_ID) ? [RULE_ID] : [];

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rulesToRemove,
    addRules: [newRule]
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log("Cookie blocking rule has been successfully set.");
    }
  });
});
