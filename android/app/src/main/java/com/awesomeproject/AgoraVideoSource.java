package com.awesomeproject;
import io.agora.rtc.mediaio.IVideoFrameConsumer;
import io.agora.rtc.mediaio.IVideoSource;
import io.agora.rtc.mediaio.MediaIO;

public class AgoraVideoSource implements IVideoSource {
    private IVideoFrameConsumer mConsumer;

    @Override
    public boolean onInitialize(IVideoFrameConsumer iVideoFrameConsumer) {
        mConsumer = iVideoFrameConsumer;
        return true;
    }

    @Override
    public boolean onStart() {
        return true;
    }

    @Override
    public void onStop() {
    }

    @Override
    public void onDispose() {
    }

    @Override
    public int getBufferType() {
        return MediaIO.BufferType.BYTE_ARRAY.intValue();
    }

    @Override
    public int getCaptureType() {
        return 0;
    }

    @Override
    public int getContentHint() {
        return 0;
    }

    public IVideoFrameConsumer getConsumer() {
        return mConsumer;
    }
}