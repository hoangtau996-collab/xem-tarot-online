#!/usr/bin/env bash
# Đẩy các commit đã tạo lên GitHub khi kết thúc phiên làm việc.
#
# Chỉ push những commit ĐÃ có sẵn. Hook này không bao giờ:
#   - tự commit, tự stage, hay đụng vào working tree
#   - push --force
#   - tạo upstream mới cho nhánh chưa có
# Không có gì để push thì im lặng thoát.
set -uo pipefail

# Hook chạy với cwd là thư mục dự án.
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

# Detached HEAD: không có nhánh nào để push.
branch=$(git symbolic-ref --quiet --short HEAD) || exit 0

# Nhánh chưa có upstream: bỏ qua, việc chọn upstream là quyết định của người dùng.
upstream=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null) || exit 0

ahead=$(git rev-list --count "$upstream..HEAD" 2>/dev/null) || exit 0
[ "${ahead:-0}" -gt 0 ] || exit 0

if out=$(git push origin "$branch" 2>&1); then
  printf '{"systemMessage":"Auto-push: %s commit -> %s"}\n' "$ahead" "$upstream"
else
  detail=$(printf '%s' "$out" | tr -d '\r' | tr '\n' ' ' | sed 's/["\\]/ /g' | cut -c1-200)
  printf '{"systemMessage":"Auto-push that bai (%s): %s"}\n' "$branch" "$detail"
fi

exit 0
